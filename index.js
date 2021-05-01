(function () {
    "use strict";

    var randint = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    function choose(choices) {
        var index = Math.floor(Math.random() * choices.length);
        return choices[index];
    }
    
    /* 
    Maybe if the program asked questions about the time complexity and then the user
    puts the function into desmos. After a graph is revealed showing the correct graph
    compared to your answer  (Possibly without showing the correct equation)
    or something like that y
    Somehow get a bunch of types of function we want to represent and pick randomly, then pick values to alter them 
    Where index is for types of functions []
    function choose(choices) {
        var index = Math.floor(Math.random() * choices.length);
        return choices[index];
    }
    
    Types ideas potentially/writing my thoughts:  x^n (normal), x^n where n < 1, logorithm, a/(x^n), 
    For sure
    */
    let randomPolynomial = function() {
         var degree = randint(2, 5);
         var coeffs = [];
         for (var i = 0; i < degree; i++) {
             coeffs.push(randint(1, 11));
         }
         return coeffs;
    };
    
    let polynomialToDesmosExpr = function(polynomial) {
        var exprChunks = [];
        var currentExponent = polynomial.length - 1;
        polynomial.forEach(function(coeff) {
            if (currentExponent == 0) {
                exprChunks.push(coeff.toString());
            } else if (currentExponent == 1) {
                exprChunks.push(coeff.toString() + "x");
            } else {
                exprChunks.push(coeff.toString() + "x^" + currentExponent.toString());
            }
            currentExponent--;
        });
        return "y = " + exprChunks.join(" + ");
    };

    let randomSquareRoot = function() {
        let exponent = Math.random() * (1 - 0.01) + 0.01; //[0.01, 1)
        let coefficient = Math.floor(Math.random() * 51); //[0, 50]
        let constant = Math.floor(Math.random() * 51);
        return {exponent: exponent, coefficient: coefficient, constant: constant};
    };

    let squareRootToDesmosExpr = function(squareRoot) {
        return "y = " + squareRoot.coefficient.toString() + `x^(${squareRoot.exponent.toString()})` +
          + " + " + squareRoot.constant.toString();
    };

    let randomLogarithm = function(){

        let outerCoeff = randint(1, 11).toString();
        let innerCoeff = randint(1, 11).toString();
        return {outerCoeff: outerCoeff, innerCoeff: innerCoeff};

    }

    let logarithmToDesmosExpr = function(logarithm){
        // \log_{10} 3
        return "y = " + logarithm.outerCoeff + "\\log_{2}" + logarithm.innerCoeff + "x";
    };

    let randomInverse = function() {
        let exponent = -1 * Math.floor(Math.random() * (11-0.01) - 0.01); //[-10, -0.01] This is to avoid making 0 exponent possible
        let coefficient = Math.floor(Math.random() * 51); //[0, 50]
        let constant = Math.floor(Math.random() * 51);
        return {exponent: exponent, coefficient: coefficient, constant: constant};
    }

    let inverseToDesmosExpr = function(inverse) {
        return "y = (" + inverse.coefficient.toString() + `/x^(${inverse.exponent.toString()}))` + " + " + inverse.constant.toString();
    };

    let logLinearToDesmosExpr = function(logarithm) {
        return "y = " + logarithm.outerCoeff + "x \\log_{2}" + logarithm.innerCoeff + "x";
    }

    var functionTypes = [
        {
            "name": "polynomial",
            "generator": randomPolynomial,
            "display": polynomialToDesmosExpr,
        },

        {
            "name": "squareRoot",
            "generator": randomSquareRoot,
            "display": squareRootToDesmosExpr,
        },
        
        {
            "name": "logarithmic",
            "generator": randomLogarithm,
            "display": logarithmToDesmosExpr
        },

        {
            "name": "loglinear",
            "generator": randomLogarithm,
            "display": logLinearToDesmosExpr
        },

        {
            "name": "inverse",
            "generator": randomInverse,
            "display": inverseToDesmosExpr
        }
    ]

    var randomizeFunction = function() { 
        window.currentFunction = choose(functionTypes);
        console.log(window.currentFunction);
        window.currentFunctionData = currentFunction.generator();
        console.log(window.currentFunctionData);
        
        calculator.setExpression({id: "graph1", latex: currentFunction.display(currentFunctionData)});
    };
    
    var init = function() {
        window.desmos = document.getElementById("calculator");
        window.calculator = Desmos.GraphingCalculator(desmos);
        randomizeFunction();
    };

    document.addEventListener("DOMContentLoaded", init);
})();
