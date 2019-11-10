import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { Config } from 'src/app/helpers/config';
import { OverlayService } from 'src/app/services/overlay.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authState: Observable<firebase.User>;
    user: any;

    constructor(
        private nav: NavController,
        private db: AngularFirestore,
        private fbAuth: AngularFireAuth,
        private overlay: OverlayService

    ) {
        this.authState = fbAuth.authState;
    }

    get isAuthenticated(): Observable<boolean> {
        return this.authState.pipe(map(user => user !== null));
    }

    async loginWithMail({ email, senha }) {
        const loading = await this.overlay.loading();

        return this.fbAuth.auth.signInWithEmailAndPassword(email, senha)
            .then(() => this.nav.navigateForward(Config.startingPage))
            .catch(async error => await this.overlay.toast({ message: 'Dados de acesso incorretos' }))
            .finally(() => loading.dismiss());
    }

    loginWithFacebook(): Promise<auth.UserCredential> {
        return this.fbAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
    }

    logonWithMail(data: any) {
        return this.fbAuth.auth.createUserWithEmailAndPassword(data.email, data.senha)
            .then(credential => {
                credential.user.updateProfile({ displayName: data.nome }).then(res => console.log(res));
                const usuario = this.db.collection('usuario');
                usuario.add({
                    nome:  data.nome,
                    snome: data.snome,
                    email: data.email,
                    funcao: data.funcao,
                    id: credential.user.uid,
                });
            });
    }

    async logout() {
        const loading = await this.overlay.loading();
        this.fbAuth.auth.signOut()
            .then(() => {
                this.nav.navigateForward('auth');
                loading.dismiss();
            });
    }

}
