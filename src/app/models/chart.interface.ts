export interface Axe {
    label: Object; // Valor por defecto: {color: 'white';}
    position: string;
    type: string;
    keys?: string[];
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

export interface Legend {
    item: Item;
}

export interface Item {
    toggleSeriesVisible: boolean;
}

export interface Chart {
    axes: Axe[];
    series: Serie[];
    background?: Background;
    data: Object[];
    legend?: Legend;
}