module common {
    var id = 1;
    export function newId(): string {
        return +new Date + "" + id++;
    }
}