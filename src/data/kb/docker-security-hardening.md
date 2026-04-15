---
title: "Docker Security Hardening"
tags: ["docker", "security", "devops"]
description: "Step-by-step guide to securing your Docker configuration."
lastUpdated: 2026-03-25
---

## Run as Non-Root

```dockerfile
RUN addgroup -S app && adduser -S app -G app
USER app
```

## Read-Only Filesystem

```bash
docker run --read-only --tmpfs /tmp myimage
```

## Limit Capabilities

```bash
docker run --cap-drop ALL --cap-add NET_BIND_SERVICE myimage
```

## Resource Limits

```bash
docker run --memory 256m --cpus 0.5 --pids-limit 100 myimage
```

## Network Isolation

```bash
docker network create --internal isolated_net
docker run --network isolated_net myimage
```

## Security Scanning

```bash
# Scan image for vulnerabilities
docker scout cves myimage:latest

# Scan with Trivy
trivy image myimage:latest
```

## Secrets Management

Never bake secrets into images. Use Docker secrets or mount them at runtime:

```bash
docker run --secret id=db_pass,src=./db_password.txt myimage
```

## Audit Logging

Enable daemon-level audit logging:

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```
