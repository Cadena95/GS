export class Persona {

    constructor(
        private _nombre: String,
        private _sexo: String,
        private _salario: number,
        private _horasSemana: number
    ) { }

    public get horasSemana(): number {
        return this._horasSemana;
    }
    public set horasSemana(value: number) {
        this._horasSemana = value;
    }
    public get salario(): number {
        return this._salario;
    }
    public set salario(value: number) {
        this._salario = value;
    }
    public get sexo(): String {
        return this._sexo;
    }
    public set sexo(value: String) {
        this._sexo = value;
    }
    public get nombre(): String {
        return this._nombre;
    }
    public set nombre(value: String) {
        this._nombre = value;
    }

}