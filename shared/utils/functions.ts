export function parseDate(date: string | null | undefined): string {
    if (!date) return '-'

    return new Date(date).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}
