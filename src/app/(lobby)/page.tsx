// import { Math, MathContext } from '@/components/math'
import { PopulationChart } from '@/components/population-chart'
import { Shell } from '@/components/shells/shell'

export default function Home() {
  // const fc = (t) => {
  //   return 210000 / (1 + 34 * Math.exp(-0.03 * t))
  // }

  return (
    <Shell>
      <h1 className="text-center text-6xl font-bold underline decoration-sky-400 decoration-wavy decoration-2">
        Practica 1
      </h1>
      <div>
        <h2 className="text-2xl font-semibold">Integrantes</h2>
        <ul>
          <li>Astudillo Pérez Edwin Uriel</li>
          <li>Avila Ponce Alexander Kalid</li>
          <li>Pérez Méndez Nancy</li>
          <li>Posadas Villegas Octavio</li>
          <li>Ramirez Embarcadero Valeria</li>
          <li>Leyva López Daniel</li>
        </ul>
      </div>

      <h2 className="text-2xl font-semibold">Introduccion</h2>
      <p className="text-justify">
        Los modelos de crecimiento poblacional son herramientas fundamentales
        para comprender cómo cambian las poblaciones de seres vivos a lo largo
        del tiempo. Estos modelos tienen una estrecha relación con el estudio
        del cálculo, ya que implican conceptos matemáticos y cálculos para
        describir y predecir el crecimiento de poblaciones en función de
        diversas variables. Existen dos grandes modelos que destacan en esta
        área, el primero de ellos es el modelo de crecimiento poblacional
        exponencial, el cual describe un crecimiento ilimitado y continuo de una
        población en ausencia de factores limitantes. Esta descripción se basa
        en una tasa de crecimiento constante, lo que resulta en una curva de
        crecimiento exponencial. La ecuación diferencial utilizada para este
        modelo es una de las más simples ya que implica tasas de cambio y la
        resolución de una ecuación diferencial ordinaria. Por otro lado, el
        modelo de crecimiento poblacional logístico tiene en cuenta la capacidad
        de carga del entorno, lo que significa que no puede haber un crecimiento
        indefinido. Este modelo también se basa en una ecuación diferencial que
        implica cálculos de tasas de cambio, pero incorpora una función
        logística que describe cómo la población se estabiliza a medida que se
        acerca a su capacidad de carga.
      </p>
      <h2 className="text-2xl font-semibold">Objetivo</h2>
      <p className="text-justify">
        El objetivo de esta práctica es desarrollar un programa que sea capaz de
        graficar la función de crecimiento poblacional tanto exponencial como
        logística. Este ejercicio permitirá a los estudiantes aplicar los
        conocimientos teóricos sobre estas funciones matemáticas en un contexto
        práctico y visual. Al completar la práctica, se espera que los
        estudiantes sean capaces de comprender y analizar el comportamiento de
        una población a lo largo del tiempo, considerando tanto el crecimiento
        exponencial ilimitado como el crecimiento limitado por factores como la
        capacidad de carga del entorno. Además, esta tarea fomentará la
        habilidad para utilizar herramientas computacionales en la
        representación gráfica de problemas matemáticos complejos, mejorando así
        su comprensión de conceptos clave en cálculo y modelado matemático.
      </p>
      {/* <MathContext>
        <h2>Basic Math example with Latex</h2>
        <Math>{'\\(\\frac{10}{4x} \\approx 2^{12}\\)'}</Math>
      </MathContext> */}

      <PopulationChart />
    </Shell>
  )
}
