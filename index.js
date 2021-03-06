(function () {
    "use strict";

    let randint = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    function choose(choices) {
        let index = Math.floor(Math.random() * choices.length);
        return choices[index];
    }
    
	let parentFunctions = ["\\log_{2}x", "\\sqrt{x}", "x", "x\\log_{2}x", "x^2"];
    /* 
    Maybe if the program asked questions about the time complexity and then the user
    puts the function into desmos. After a graph is revealed showing the correct graph
    compared to your answer  (Possibly without showing the correct equation)
    or something like that y
    
    Types ideas potentially/writing my thoughts:  x^n (normal), x^n where n < 1, logorithm, a/(x^n)

    */
    let randomPolynomial = function() {
         let degree = randint(2, 3);
         let coeffs = [];
         for (let i = 0; i < degree; i++) {
             coeffs.push(randint(1, 11));
         }
         return coeffs;
    };
    
    let polynomialToDesmosExpr = function(polynomial) {
        let exprChunks = [];
        let currentExponent = polynomial.length - 1;
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
        let coefficient = Math.floor(Math.random() * 20 + 1); //[1, 20] 
        let constant = Math.floor(Math.random() * 11);
        exponent = exponent.toFixed(5);
        return {exponent: exponent, coefficient: coefficient, constant: constant};
    };

    let squareRootToDesmosExpr = function(squareRoot) {
        return "y = " + squareRoot.coefficient.toString() + "x^{" + squareRoot.exponent.toString()
          + "} + " + squareRoot.constant.toString();
    };

    let randomLogarithm = function(){

        let outerCoeff = randint(1, 11).toString();
        let innerCoeff = randint(1, 11).toString();
        return {outerCoeff: outerCoeff, innerCoeff: innerCoeff};

    };

    let logarithmToDesmosExpr = function(logarithm){
        return "y = " + logarithm.outerCoeff + "\\log_{2}" + logarithm.innerCoeff + "x";
    };

    let logLinearToDesmosExpr = function(logarithm) {
        return "y = " + logarithm.outerCoeff + "x \\log_{2}" + logarithm.innerCoeff + "x";
    };

    let functionTypes = [
        {
            "name": "polynomial",
            "generator": randomPolynomial,
            "display": polynomialToDesmosExpr,
			"rank": "special_cased_can_be_squared_or_just_linear",
        },

        {
            "name": "square root",
            "generator": randomSquareRoot,
            "display": squareRootToDesmosExpr,
			"rank": 1,
        },
        
        {
            "name": "logarithmic",
            "generator": randomLogarithm,
            "display": logarithmToDesmosExpr,
			"rank": 0,
        },

        {
            "name": "loglinear",
            "generator": randomLogarithm,
            "display": logLinearToDesmosExpr,
			"rank": 3,
        },
    ]

    let randomizeFunction = function() { 
        window.currentFunction = choose(functionTypes);
        
        window.currentFunctionData = currentFunction.generator();
        
        document.getElementById("function").innerHTML = "";
        
        document.getElementById("function").innerHTML = "$$" + currentFunction.display(currentFunctionData) + "$$";
        calculator.setExpression({id: "graph1", latex: currentFunction.display(currentFunctionData), color: Desmos.Colors.PURPLE});
        let randomParentFunction = randomizeParentFunction();
        let parentFunctionLatex = randomParentFunction[0];
        let parentFunction = randomParentFunction[1];
		window.parentFunctionName = randomParentFunction[2];
        
        document.getElementById("parentFunction").innerHTML = parentFunctionLatex;
        calculator.setExpression({id: "graph2", latex: parentFunction});
        calculator.setExpression({id: "graph3", latex: "c = 1"})
        calculator.setExpression({id: "graph4", latex: "x = k", color: Desmos.Colors.RED})
        calculator.setExpression({id: "graph5", latex: "k = 1"})
		
		setTimeout(function(){window.MathJax.typeset();},10);
    };
    
	window.isLowerThan  = function() {
		let rank = 0;
		if (currentFunction.name == "polynomial") {
			rank = currentFunctionData.length == 3 ? 4 : 2
		} else {
			rank = currentFunction.rank;
		}
		let parentRank = parentFunctions.indexOf(parentFunctionName);
		console.log(rank + " " + parentRank);
		return rank <= parentRank;
	};
	
	let doCheckAnswer = function() {
		var no = document.getElementById("no").checked;
		var yes = document.getElementById("yes").checked;
		if (!no && !yes) return;
		
		if (yes == isLowerThan()) {
			alert("Nice one!");
		} else {
			alert("Not quite!");
		}
	};
	
    let randomizeParentFunction = function(){
        let parentFunction = parentFunctions[randint(0, 4)];
        return ["$$O(" + parentFunction + ")?$$", "y = c("+parentFunction+")", parentFunction];
    };

    let init = function() {
        window.desmos = document.getElementById("calculator");
        window.calculator = Desmos.GraphingCalculator(desmos);
        randomizeFunction();
        document.getElementById("newFunction").addEventListener("click", randomizeFunction);
		document.getElementById("submit").addEventListener("click", doCheckAnswer);

    };
    
    document.addEventListener("DOMContentLoaded", init);
})();
