#!/usr/bin/env npx --package=ts-node -- ts-node-esm --swc

import "zx/globals";

try {
  await $`kubectl create namespace argocd`;
  await $`kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml`;
  await $`kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}}'`;
} catch (p) {
  console.log(`Exit code: ${p.exitCode}`);
  console.error(`Error: ${p.stderr}`);
}
