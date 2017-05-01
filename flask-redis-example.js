var redis = require("github.com/quilt/redis");
var rds = new redis.Redis(1, "AUTH_PASSWORD");
rds.exclusive();
var flask_service = new Service(
    "flask_service",
    [new Container("osalpekar/flask-redis-webapp:latest")]
);

var namespace = createDeployment({});

var baseMachine = new Machine({
    provider: "Amazon",
    size: "m4.large",
    sshKeys: githubKeys("osalpekar"),
});

namespace.deploy(rds);
namespace.deploy(flask_service);
namespace.deploy(baseMachine.asMaster());
namespace.deploy(baseMachine.asWorker().replicate(3));
