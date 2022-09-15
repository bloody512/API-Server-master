const path = require('path');
const fs = require('fs');
const Repository = require('../models/repository');
module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
        }
        get() {
            if(this.HttpContext.path.queryString == "?")
            {
                // send helpPage
                let helpPagePath = path.join(process.cwd(), "wwwroot/helpPages/mathServiceHelp.html");
                let content = fs.readFileSync(helpPagePath);
                this.HttpContext.response.content("text/html", content);
            }else{
                if(this.HttpContext.path.params.op)
                {
                    var op = this.HttpContext.path.params.op;
                    if(this.HttpContext.path.params.op == '!' || this.HttpContext.path.params.op == 'p' || this.HttpContext.path.params.op == "np")
                    {
                        if(this.HttpContext.path.params.n)
                        {
                            if(Object.keys(this.HttpContext.path.params).length <= 2)
                                {
                                let n = this.HttpContext.path.params.n;
                                if(op === '!')
                                {
                                    if(n > 1)
                                    {
                                        this.HttpContext.path.params.value = factorial(n);
                                    }
                                    else if(n == 0 || n == 1)
                                    {
                                        this.HttpContext.path.params.value = 1
                                    }
                                    else
                                    {
                                        this.HttpContext.path.params.error = "parameter 'n' must be higher then 0";
                                    }
                                }
                                else if(op === 'p')
                                {
                                    let estPremier = isPrime(n);
                                    if(estPremier)
                                        this.HttpContext.path.params.value = true;
                                        else
                                        this.HttpContext.path.params.value = false;
                                }
                                else if(op == "np")
                                {
                                    this.HttpContext.path.params.value = findPrime(n);
                                }
                            }
                            else
                            {
                                this.HttpContext.path.params.error = "can't take more then 1 value";
                            }
                        }
                        else
                        {
                            this.HttpContext.path.params.error = "parameter 'n' is missing";
                        }
                    }
                    else
                    {
                        // section prenant 2 valeur
                        if(this.HttpContext.path.params.x)
                        {
                            if(this.HttpContext.path.params.y)
                            {
                                if(Object.keys(this.HttpContext.path.params).length <= 3)
                                {
                                    let x = parseInt(this.HttpContext.path.params.x);
                                    let y = parseInt(this.HttpContext.path.params.y);
                                    let valeur = 0;
                                    if(op == '+' || op == ' ')
                                    {
                                        this.HttpContext.path.params.op = "+";
                                        valeur = x + y;
                                        this.HttpContext.path.params.value = valeur;
                                    }
                                    else if(op == '-')
                                    {
                                        valeur = x - y;
                                        this.HttpContext.path.params.value = valeur;
                                    }
                                    else if(op == '*')
                                    {
                                        valeur = x * y;
                                        this.HttpContext.path.params.value = valeur;
                                    }
                                    else if(op == '/')
                                    {
                                        if(y != 0)
                                        {
                                            valeur = x / y;
                                            this.HttpContext.path.params.value = valeur;
                                        }
                                        else
                                        {
                                            this.HttpContext.path.params.value = null;
                                        }
                                    }
                                    else if(op == '%')
                                    {
                                        if(y != 0)
                                        {
                                            valeur = x % y;
                                            this.HttpContext.path.params.value = valeur;
                                        }
                                        else
                                        {
                                            this.HttpContext.path.params.value = null;
                                        }
                                    }
                                }
                                else
                                {
                                    this.HttpContext.path.params.error = "can't take more then 2 values";
                                }
                            }
                            else
                            {
                                this.HttpContext.path.params.error = "parameter 'y' is missing";
                            }
                        }
                        else
                        {
                            this.HttpContext.path.params.error = "parameter 'x' is missing";
                        }
                    }
                }
                else
                {
                    this.HttpContext.path.params.error = "parameter 'op' is missing";
                }
                this.HttpContext.response.JSON(this.HttpContext.path.params);
            }
        }
    }

    function factorial(n){
        if(n===0||n===1){
          return 1;
        }
        return n*factorial(n-1);
    }
    function isPrime(value) {
        for(var i = 2; i < value; i++) {
            if(value % i === 0) {
                return false;
            }
        }
        return value > 1;
    }
    function findPrime(n){
        let primeNumer = 0;
        for ( let i=0; i < n; i++){
            primeNumer++;
            while (!isPrime(primeNumer)){
                primeNumer++;
            }
        }
        return primeNumer;
    }