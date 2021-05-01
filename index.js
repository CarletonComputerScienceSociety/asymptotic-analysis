(function () {
    "use strict";

    var randint = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var randomPolynomial = function() {
         var degree = randint(1, 5);
         var coeffs = [];
         for (var i = 0; i < degree; i++) {
             coeffs.push(randint(1, 11));
         }
    };

    var init = function() {
        window.desmos = document.getElementById("calculator");
        window.calculator = Desmos.GraphingCalculator(desmos);
        calculator.setExpression({ id: 'graph1', latex: `y=x^2` });
    };

    document.addEventListener("DOMContentLoaded", init);
})();


/* 
Maybe if the program asked questions about the time complexity and then the user
puts the function into desmos. After a graph is revealed showing the correct graph
compared to your answer (Possibly without showing the correct equation)
or something like that 
 */