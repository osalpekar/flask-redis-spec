

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

namespace.deploy(flask_service);
namespace.deploy(baseMachine.asMaster());
namespace.deploy(baseMachine.asWorker());


