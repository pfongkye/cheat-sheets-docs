---
id: doc_ops
title: Kubernetes And Friends
sidebar_label: Ops
---

## Kubernetes

dashboard: http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/

### Deleting by label

```cmd
kubectl --namespace=<namespace> get pod <pod> --show-labels
kubectl --namespace=<namespace> delete pods -l app=<app-name>
```

### Listing env

```cmd
kubectl --namespace=<namespace> exec <pod> env
```

### Refresh token

Remove refresh token from .kube/config on password change. Remove also the lines `expires-in` and `expires-on`.

## Docker

On password change, restart docker for windows (to avoid issues with shared drives, mounting, etc.)
