export default class List<T> {
    private idFn: (item: T) => string | number;
    protected list: T[];

    constructor(idFn: (item: T) => string | number, list: T[] = []) {
        this.idFn = idFn;
        this.list = list;
    }

    public get self() {
        return this.list;
    }

    public set self(list: T[]) {
        this.list = list;
    }

    public isEqual(a: T, b: T) {
        return this.idFn(a) === this.idFn(b);
    }

    public indexOf(item: T): number {
        for (let i = 0; i < this.self.length; i++) {
            if (this.isEqual(this.self[i], item)) return i; 
        }
        return -1;
    }

    public contains(item: T): boolean {
        return this.indexOf(item) !== -1;
    }

    public push(item: T) {
        this.list.push(item);
    }

    public remove(item: T) {
        const index = this.indexOf(item);
        if (index !== -1) {
            this.list.splice(index, 1);
        }
    }
}