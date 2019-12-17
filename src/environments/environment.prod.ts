export const environment = {
    test: false,
    production: true,
    server_url: 'https://app.dentalbit.com.br/'
};

export function api(ctrl, meth) {
    return environment.server_url + 'api/' + ctrl + 'Rest/' + meth;
}
