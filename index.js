var exec = require('child_process').exec;

var ncker = {
    exec: exec,
    run: function(settings) {
        var command = this.buildCmd(settings);
        exec(command, function(err, out, stderr) {
            if (err) console.log(err);
            if (out) console.log(out);
            if (stderr) console.log(stderr);
        });
    },
    buildCmd: function(settings) {
        //console.log(Object.keys(settings));
        var image = "";
        var command = "";
        var options = "";
        Object.keys(settings).forEach(function(key, next) {
            switch (key) {
                case "image":
                    image = settings[key];
                    break;
                case "ports":
                    var ports = "";
                    Object.keys(settings[key]).forEach(function(hostport) {
                        ports += "-p " + settings[key][hostport] + " ";
                    });
                    options += ports;
                    break;
                case "volumes":
                    var volumes = "";
                    Object.keys(settings[key]).forEach(function(volume) {
                        volumes += "-v " + settings[key][volume] + " ";
                    });
                    options += volumes + " ";
                    break;
                case "command":
                    command = settings[key];
                    break;
                case "workingdir":
                    options += "-w " + settings[key] + " ";
                    break;
                case "detached":
                    var detatched = "-d ";
                    if (!settings[key]) {
                        detatched = "";
                    }
                    options += detatched + " ";
                    break;
                case "name":
                    options += "--name " + settings[key] + " ";
                    break;
                case "rm":
                    options += "--rm ";
                    break;
                case "dnshost":
                    //console.log(settings[key]);
                    break;
            }
        });
        var returnCommand = "docker run " + options +" "+ image +" "+ command;
        console.log(returnCommand);
        return returnCommand;
    }
};

module.exports = ncker;