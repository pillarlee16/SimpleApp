(function(){
    if (! jasmine) {
        throw new Exception('jasmine library does not exist in global namespace!');
    }
    
    function trim(str) {
        return str.replace(/^\s+/, '').replace(/\s+$/, '');
    }
    
    function escapeInvalidXmlChars(str) {
        return str.replace(/\&/g, '&amp;')
            .replace(/</g, '&lt')
            .replace(/\>/g, '&gt')
            .replace(/\"/g, '^quot;')
            .replace(/\'/g, '&apos;');
    }
    
    var JSCoverageReporter = function() {
        
    };
    
    JSCoverageReporter.prototype = {
        reportRunnerResults: function(runner) {
            if (typeof top._$jscoverage  == 'undefined') {
                return false;
            }
            var cc = top._$jscoverage;
            
            var totals = { files:0, statements:0, executed:0, coverage:0, skipped:0 };
            
            var file;
            var files = [];
            for (file in cc) {
                files.push(file);
            }
            files.sort();
            
            var classesXml = [];
            classesXml.push('<classes>');
            
            var rowCounter = 0;
            for (var f=0; f<files.length; f++) {
                file = files[f];
                var lineNumber;
                var num_statements = 0;
                var num_executed = 0;
                var missing = [];
                var fileCC = cc[file];
                var length = fileCC.length;
                var currentConditionalEnd = 0;
                var conditionals = null;
                if (fileCC.conditionals) {
                    conditionals = fileCC.conditionals;
                }
                for (lineNumber = 0; lineNumber<length; lineNumber++) {
                    var n = fileCC[lineNumber];
                    
                    if (lineNumber === currentConditionalEnd) {
                        currentConditionalEnd = 0;
                    }
                    else if (currentConditionalEnd === 0 && conditionals && conditionals[lineNumber]) {
                        currentConditionalEnd = conditionals[lineNumber];
                    }
                    
                    if (currentConditionalEnd !== 0) {
                        continue;
                    }
                    if (n === undefined || n === null) {
                        continue;
                    }
                    
                    if (n === 0 ) {
                        missing.push(lineNumber);
                    }
                    else {
                        num_executed++;
                    }
                    num_statements++;
                }
                var percentage = ( num_statements === 0 ? 0 : num_executed / num_statements );

                // make xml
                var classXml = [];
                classXml.push('<class name="'+file+'" filename="'+file+'" line-rate="'+percentage+'">');
                classXml.push('<methods></methods>');
                classXml.push('<lines>');
                for (lineNumber = 0; lineNumber<length; lineNumber++) {
                    var n = fileCC[lineNumber];
                    
                    if (n === undefined || n === null) {
                        continue;
                    }
                    
                    classXml.push('<line number="'+lineNumber+'" hits="'+n+'" branch="false" />');
                }
                classXml.push('</lines>');
                classXml.push('</class>');
                classesXml.push(classXml.join(''));
                
                totals['files']++;
                totals['statements'] += num_statements;
                totals['executed'] += num_executed;
                totals['coverage'] += percentage;
                if (num_statements === 0) {
                    totals['skipped']++;
                }
            }
            classesXml.push('</classes>');
            
            var coverageXml = [];
            coverageXml.push('<?xml version="1.0"?>');
            coverageXml.push('<!DOCTYPE coverage SYSTEM "http://cobertura.sourceforge.net/xml/coverage-04.dtd">');
            coverageXml.push('<coverage line-rate="'+totals['coverage']+'" lines-covered="'+totals['executed']+'" lines-valid="'+totals['statements']+'">');
            coverageXml.push('<sources>');
            coverageXml.push('<source>/home/redmine/.hudson/jobs/SimpleApp/workspace/app/backbone-require</source>');
            coverageXml.push('<source>--source</source>');
            coverageXml.push('</sources>');
            coverageXml.push('<packages>');
            coverageXml.push('<package name="" line-rate="'+totals['coverage']+'">');
            coverageXml.push(classesXml.join(''));
            coverageXml.push('</package>');
            coverageXml.push('</packages>');
            coverageXml.push('</coverage>');
            
            this.writeFile('./build/test/report/cobertura/coverage.xml', coverageXml.join(''));
        },
        writeFile: function(filename, text) {
            // PhantomJS, via a method injected by phantomjs-testrunner.js
            try {
                __phantom_writeFile(filename, text);
                return;
            } catch (f) {}
            // Rhino
            try {
                var out = new java.io.BufferedWriter(new java.io.FileWriter(filename));
                out.write(text);
                out.close();
                return;
            } catch (e) {}
            // Node.js
            try {
                var fs = require("fs");
                var fd = fs.openSync(filename, "w");
                fs.writeSync(fd, text, 0);
                fs.closeSync(fd);
                return;
            } catch (g) {}
        }
    };
    
    jasmine.JSCoverageReporter = JSCoverageReporter;
})();
