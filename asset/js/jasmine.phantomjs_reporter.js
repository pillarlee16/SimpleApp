(function() {
    if (! jasmine) {
        throw new Exception("jasmine library does not exist in global namespace!");
    }
    
    var PhantomjsReporter = function() {
        this.executed_specs = 0;
        this.passed_specs = 0;
    };
    
    PhantomjsReporter.isSucceeded = false;
    PhantomjsReporter.isFinished = false;
    
    PhantomjsReporter.prototype = {
        reportRunnerResults: function(runner) {
            var failed_specs = this.executed_specs - this.passed_specs;
            
            PhantomjsReporter.isSucceeded = (failed_specs == 0) ? true : false;
            PhantomjsReporter.isFinished = true;
        },
        
        reportSpecStarting: function(spec) {
            this.executed_specs++;
        },
        
        reportSpecResults: function(spec) {
            if (spec.results().passed()) {
                this.passed_specs++;
            }
        }
    }
    
    jasmine.PhantomjsReporter = PhantomjsReporter;
})();
