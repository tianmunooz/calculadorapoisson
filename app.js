<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora de Distribución de Poisson</title>
    <style>
        /* Estilos inspirados en Tailwind */
        :root {
            --primary: #4f46e5;
            --primary-hover: #4338ca;
            --primary-light: #eef2ff;
            --gray-100: #f3f4f6;
            --gray-200: #e5e7eb;
            --gray-300: #d1d5db;
            --gray-700: #374151;
            --gray-800: #1f2937;
            --red-100: #fee2e2;
            --red-600: #dc2626;
            --green-100: #dcfce7;
            --green-700: #15803d;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            background-color: #f9fafb;
            color: var(--gray-800);
            line-height: 1.5;
        }
        
        .container {
            max-width: 768px;
            margin: 0 auto;
            padding: 1.5rem;
        }
        
        .card {
            background-color: white;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            padding: 1.5rem;
            margin-bottom: 1.5rem;
        }
        
        .header {
            background-color: var(--primary);
            color: white;
            padding: 1.5rem;
            border-radius: 0.5rem 0.5rem 0 0;
            margin: -1.5rem -1.5rem 1.5rem -1.5rem;
        }
        
        h1 {
            font-size: 1.5rem;
            font-weight: 700;
            text-align: center;
        }
        
        h2 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--gray-800);
        }
        
        .form-group {
            margin-bottom: 1.25rem;
        }
        
        label {
            display: block;
            font-weight: 500;
            margin-bottom: 0.5rem;
            color: var(--gray-700);
        }
        
        .description {
            font-size: 0.875rem;
            color: var(--gray-700);
            margin-bottom: 0.5rem;
            line-height: 1.4;
        }
        
        input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--gray-300);
            border-radius: 0.375rem;
            font-size: 1rem;
            transition: border-color 0.15s ease-in-out;
        }
        
        input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
        }
        
        .button {
            background-color: var(--primary);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.375rem;
            font-weight: 500;
            cursor: pointer;
            font-size: 1rem;
            width: 100%;
            transition: background-color 0.15s ease-in-out;
        }
        
        .button:hover {
            background-color: var(--primary-hover);
        }
        
        .result {
            background-color: var(--primary-light);
            border-radius: 0.375rem;
            padding: 1.25rem;
            display: none;
            margin-top: 1.5rem;
        }
        
        .formula-card {
            background-color: var(--gray-100);
            border-radius: 0.375rem;
            padding: 1rem;
            margin: 1rem 0;
            border-left: 4px solid var(--primary);
        }
        
        .formula {
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
            text-align: center;
            font-size: 1.125rem;
        }
        
        .error {
            background-color: var(--red-100);
            color: var(--red-600);
            padding: 0.75rem;
            border-radius: 0.375rem;
            display: none;
            margin-top: 1rem;
        }
        
        .badge {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 500;
            margin-right: 0.5rem;
            background-color: var(--primary-light);
            color: var(--primary);
        }
        
        .divider {
            height: 1px;
            background-color: var(--gray-200);
            margin: 1.5rem 0;
        }
        
        .result-value {
            font-weight: 700;
            color: var(--primary);
        }
        
        .interpretation {
            background-color: var(--green-100);
            border-radius: 0.375rem;
            padding: 0.75rem;
            margin-top: 1rem;
            color: var(--green-700);
        }
        
        /* Responsive */
        @media (min-width: 640px) {
            .form-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="header">
                <h1>Calculadora de Distribución de Poisson</h1>
            </div>
            
            <div class="formula-card">
                <p class="formula">P(X = k) = (e<sup>-λ</sup> × λ<sup>k</sup>) / k!</p>
            </div>
            
            <div class="card-section">
                <h2>Parámetros de la distribución</h2>
                
                <div class="form-group">
                    <label for="lambda">Valor de λ (lambda):</label>
                    <p class="description">Representa la tasa media de ocurrencia del evento en un intervalo específico (tiempo, espacio, volumen, etc.). Por ejemplo, el número promedio de llamadas por hora o el número promedio de defectos por unidad.</p>
                    <input type="number" id="lambda" step="0.01" min="0" placeholder="Ingrese un valor mayor que 0">
                </div>
                
                <div class="form-group">
                    <label for="k">Valor de k (número de eventos):</label>
                    <p class="description">Representa el número exacto de eventos cuya probabilidad queremos calcular. Por ejemplo, la probabilidad de recibir exactamente 5 llamadas en una hora o encontrar exactamente 3 defectos en una unidad.</p>
                    <input type="number" id="k" step="1" min="0" placeholder="Ingrese un número entero no negativo">
                </div>
            </div>
            
            <div class="divider"></div>
            
            <button class="button" onclick="calcularPoisson()">Calcular Probabilidad</button>
            
            <div id="error" class="error"></div>
            
            <div id="resultado" class="result">
                <h2>Resultado del cálculo</h2>
                
                <div>
                    <span class="badge">Fórmula aplicada</span>
                    <p id="formula-aplicada"></p>
                </div>
                
                <div class="divider"></div>
                
                <div>
                    <span class="badge">Probabilidad</span>
                    <p id="probabilidad"></p>
                    <p id="probabilidadPorcentaje" class="result-value"></p>
                </div>
                
                <div class="interpretation" id="interpretacion"></div>
            </div>
        </div>
        
        <div class="card">
            <h2>¿Qué es la distribución de Poisson?</h2>
            <p>La distribución de Poisson es una distribución de probabilidad discreta que expresa la probabilidad de que ocurra un número determinado de eventos durante un intervalo de tiempo o espacio fijo, si estos eventos ocurren con una tasa media conocida e independientemente del tiempo transcurrido desde el último evento.</p>
            <br>
            <p>Se utiliza comúnmente para modelar situaciones como:</p>
            <ul style="list-style-type: disc; padding-left: 1.5rem; margin: 0.75rem 0;">
                <li>Número de llamadas telefónicas que llegan a un centro de servicio por hora</li>
                <li>Número de errores de impresión por página</li>
                <li>Número de clientes que llegan a un banco por minuto</li>
                <li>Número de partículas radioactivas que decaen por segundo</li>
                <li>Número de accidentes en un tramo de carretera por mes</li>
            </ul>
        </div>
    </div>

    <script>
        function factorial(n) {
            if (n === 0 || n === 1) return 1;
            let result = 1;
            for (let i = 2; i <= n; i++) {
                result *= i;
            }
            return result;
        }
        
        function calcularPoisson() {
            // Obtener valores
            const lambda = parseFloat(document.getElementById('lambda').value);
            const k = parseInt(document.getElementById('k').value);
            
            // Validar entrada
            const errorDiv = document.getElementById('error');
            const resultadoDiv = document.getElementById('resultado');
            
            errorDiv.style.display = 'none';
            resultadoDiv.style.display = 'none';
            
            if (isNaN(lambda) || lambda <= 0) {
                errorDiv.textContent = 'El valor de λ debe ser un número positivo.';
                errorDiv.style.display = 'block';
                return;
            }
            
            if (isNaN(k) || k < 0 || !Number.isInteger(k)) {
                errorDiv.textContent = 'El valor de k debe ser un entero no negativo.';
                errorDiv.style.display = 'block';
                return;
            }
            
            // Calcular la probabilidad
            const probabilidad = (Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k);
            
            // Mostrar el resultado
            document.getElementById('formula-aplicada').textContent = 
                `P(X = ${k}) = (e^(-${lambda.toFixed(2)}) × ${lambda.toFixed(2)}^${k}) / ${k}!`;
            
            document.getElementById('probabilidad').textContent = 
                `La probabilidad de que ocurran exactamente ${k} eventos es:`;
            
            document.getElementById('probabilidadPorcentaje').textContent = 
                `${(probabilidad * 100).toFixed(4)}% (${probabilidad.toFixed(8)})`;
            
            // Interpretación
            let interpretacion = `Con un valor lambda de ${lambda.toFixed(2)} (promedio de eventos esperados), `;
            interpretacion += `la probabilidad de observar exactamente ${k} eventos es del ${(probabilidad * 100).toFixed(4)}%. `;
            
            // Interpretación adicional
            if (k < lambda) {
                interpretacion += `Este número de eventos (${k}) es menor que el valor esperado (${lambda.toFixed(2)}).`;
            } else if (k > lambda) {
                interpretacion += `Este número de eventos (${k}) es mayor que el valor esperado (${lambda.toFixed(2)}).`;
            } else {
                interpretacion += `Este número de eventos coincide exactamente con el valor esperado (${lambda.toFixed(2)}).`;
            }
            
            document.getElementById('interpretacion').textContent = interpretacion;
            
            resultadoDiv.style.display = 'block';
        }
    </script>
</body>
</html>