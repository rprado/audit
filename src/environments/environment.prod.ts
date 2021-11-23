export const environment = {
    test: false,
    production: true,
    server_url: 'http://trycom.com.br/consulimp/'
};

export function api(ctrl, meth) {
    return environment.server_url + 'api/' + ctrl + 'Rest/' + meth;
}
