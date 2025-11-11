+++
title = "Docker image for cloud container orchestration"
date = "2020-12-20"

[taxonomies]
grant_type = [ "Proposal" ]
grant_category = [ "Dev: Tool" ]

[extra]
image = ""
description = "Nix infrastructure to generate Docker images for Urbit releases. Images would be suitable for cloud orchestration in e.g. Amazon ECS"
reward = "1 star"
assignee = ["Edward Amsden ~ritpub-sipsyl"]
id = "626138244"
completed = true
link = ""
+++

Many cloud providers offer container orchestration services that abstract away from managing servers or compute instances (e.g. Amazon ECS, Azure Container Instances). A docker image tagged for the latest version of Urbit would drastically simplify the process of deploying urbits to the cloud, which is preferable for planets, stars, and galaxies.

# Deliverables

- A merged pull request to the urbit/urbit repository, with nix code to generate a docker image
  - With a volume-mountable path for a ship
  - With a volume-mountable path for a keyfile
- CI integration to release the docker image as a GitHub artifact when version releases of Urbit are cut
- CI integration to publish the image on Docker Hub when version releases of Urbit are cut
- Documentation:
  - Reference for volume mounts and controlling the behavior of Urbit in a container
    - Volume mount points for keyfiles or existing ships
    - Ports to publish for Landscape and external API access.
  - Quickstarts for deploying an Urbit ship to
    - Amazon ECS
    - Azure Container Instances

# Team

Edward Amsden ~ritpub-sipsyl is a veteran developer with several years experience using Nix to manage production builds and deployments. He is the principal of Black River Software LLC

## Milestones

### Merged PR: Nix docker integration

1 stars

- Nix code to generate an Urbit docker image
- CI integration to release docker images on GitHub
- CI integration to publish docker images on Docker Hub
- Documentation
