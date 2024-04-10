import React from 'react';
import HeatMap from 'react-heatmap-grid';
import '../css/heatmapchart.css';


const HeatMapChart = ({data}) => {
    const numberOfRows = data.length; // Número de filas en los datos del HeatMap
    const numberOfColumns = data[0].length; // Número de columnas en los datos del HeatMap

    const xLabels = Array.from({ length: numberOfColumns }, () => '');
    const yLabels = Array.from({ length: numberOfRows }, () => '');

    const containerHeight = "72vh"; // Altura del contenedor padre
    const cellHeight = `calc(${containerHeight} / ${numberOfRows})`; // Calcula la altura de cada celda

    const xLabelsVisibility = new Array(xLabels.length).fill(false); // Oculta todas las etiquetas en el eje X

    return (
        <div className="custom-heatmap">
            <HeatMap
                xLabels={xLabels}
                yLabels={yLabels}
                xLabelsLocation={"bottom"}
                xLabelsVisibility={xLabelsVisibility}
                xLabelWidth={0}
                yLabelWidth={0}
                data={data}
                height={cellHeight}
                cellStyle={(background, value, min, max, data, x, y) => ({
                    background: `rgba(234, 70, 22, ${1 - (max - value) / (max - min)})`,
                    fontSize: "11px",
                })}
            />
        </div>
    );
};

export default HeatMapChart;
