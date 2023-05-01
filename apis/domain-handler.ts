//TODO: Map API Base Routes. Examples:
// Base Auth -> https://unilog.unicommerce.com
// Base API -> https://api-unilog.unicommerce.com
// Base Charts -> https://charts-unilog.unicommerce.com
// A API -> https://
type DomainMapper = {
    auth: string
    dashboard: string
    ndr: string
    default: string
    tracking: string
}

export default class DomainHandler {
    private domains: DomainMapper
    public authDomain: string
    public appDomain: string

    constructor() {
        this.domains = {
            auth: 'https://unilog.unicommerce.com',
            dashboard: 'https://unilog.unicommerce.com',
            ndr: 'https://api-unilog.unicommerce.com',
            default: 'https://unilog.unicommerce.com',
            tracking: 'https://unilog.unicommerce.com',
        }

        this.authDomain = this.domains['auth']
        this.appDomain = this.domains['ndr']
    }

    public findDomain(domain: string): string {
        switch (domain) {
            case 'tracking':
                return this.domains.tracking
            case 'auth':
                return this.domains.auth
            case 'dashboard':
                return this.domains.dashboard
            case 'ndr':
                return this.domains.dashboard
            default:
                return this.domains.default
        }
    }

    public enocodeURIparam(value: string | string[] | number | boolean) {
        if (typeof value === 'number' || typeof value === 'boolean') return value
        else if (typeof value === 'string') return encodeURIComponent(value)
        else return value.join(',')
    }
}
