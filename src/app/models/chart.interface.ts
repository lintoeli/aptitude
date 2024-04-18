export interface Axe {
    label: Object; // Valor por defecto: {color: 'white';}
    position: string;
    type: string;
    keys: string[];
}

export interface Background {
    fill: string // Valor por defecto: "#121212"
}

export interface Serie {
    type: string;
    fill: string;
    xKey: string;
    yKey: string;
}

export interface ComplexData {

}

export interface Chart {
    axes: Axe[];
    series: Serie[];
    background?: Background;
    data: Object[];
}