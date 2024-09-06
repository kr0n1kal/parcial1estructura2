class Farmacia {
    private codigo: string;
    private nombre: string;
    private preciocosto: number;
    private precioventa: number;

    constructor(codigo: string, nombre: string, preciocosto: number, precioventa: number) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.preciocosto = preciocosto;
        this.precioventa = precioventa;
    }

    public get_codigo(): string {
        return this.codigo;
    }

    public get_nombre(): string {
        return this.nombre;
    }

    public get_costo(): number {
        return this.preciocosto;
    }

    public get_venta(): number {
        return this.precioventa;
    }

    public toString(): string {
        return `${this.codigo} - ${this.nombre} - Q.${this.preciocosto} - Q.${this.precioventa}`;
    }
}

class Nodo {
    farmacia: Farmacia;
    next: Nodo | null;

    constructor(farmacia: Farmacia) {
        this.farmacia = farmacia;
        this.next = null;
    }
}

class ListaEnlazada {
    head: Nodo | null;

    constructor() {
        this.head = null;
    }

    public insert(farmacia: Farmacia): void {
        const nuevoNodo = new Nodo(farmacia);
        if (this.head === null) {
            this.head = nuevoNodo;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = nuevoNodo;
        }
    }

    public search(codigo: string): Farmacia | null {
        let current = this.head;
        while (current !== null) {
            if (current.farmacia.get_codigo() === codigo) {
                return current.farmacia;
            }
            current = current.next;
        }
        return null;
    }

    public print(): string {
        const farmacias: string[] = [];
        let current = this.head;
        while (current !== null) {
            farmacias.push(current.farmacia.toString());
            current = current.next;
        }
        return farmacias.join(", ");
    }
}

class HashTable {
    private size: number;
    private data: (ListaEnlazada | null)[];

    constructor() {
        this.size = 15;
        this.data = new Array(this.size).fill(null);
    }

    private hash(codigo: string): number {
        let hashValue = 0;
        for (let i = 0; i < codigo.length; i++) {
            hashValue += codigo.charCodeAt(i);
        }
        return hashValue % this.size;
    }

    public insertFarmacia(farmacia: Farmacia): void {
        let index: number = this.hash(farmacia.get_codigo());
        if (this.data[index] === null) {
            this.data[index] = new ListaEnlazada();
        }
        this.data[index]!.insert(farmacia);
    }

    public searchFarmacia(codigo: string): Farmacia | null {
        let index: number = this.hash(codigo);
        if (this.data[index] !== null) {
            return this.data[index]!.search(codigo);
        }
        return null;
    }

    public printFarmacias(): void {
        this.data.forEach((slot, i) => {
            if (slot === null) {
                console.log(`Espacio ${i} Vacío`);
            } else {
                console.log(`Espacio ${i}: ${slot.print()}`);
            }
        });
    }
}

let tablaHash: HashTable = new HashTable();
const farmacias: Farmacia[] = [
    new Farmacia("P001", "Pepto-Bismol", 50, 65),
    new Farmacia("P001", "Acetaminofen", 50, 60),
    new Farmacia("P003", "Enantyum", 60, 75),
    new Farmacia("P004", "Fastum", 60, 75),
    new Farmacia("P005", "Mencetamol", 60, 75),
    new Farmacia("P006", "Suero", 60, 75),
    new Farmacia("P007", "Panadol", 60, 75),
    new Farmacia("P008", "Mopen", 60, 75),
    new Farmacia("P009", "Rupax", 60, 75),
];

farmacias.forEach(farmacia => {
    tablaHash.insertFarmacia(farmacia);
});

tablaHash.printFarmacias();