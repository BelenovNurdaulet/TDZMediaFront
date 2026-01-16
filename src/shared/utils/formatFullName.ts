
type fio = {
    firstName: string;
    lastName?: string| null;
    surName?: string | null;
}

export function formatFullName(fio: fio) {
    const parts = [fio.lastName, fio.firstName, fio.surName].filter(Boolean);
    return parts.length ? parts.join(" ") : fio.firstName;
}
