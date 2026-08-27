"use client";

import React, { Suspense, useMemo, useState, useEffect } from 'react'

// Load a remoteEntry script and return the container
async function loadRemoteScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${url}"]`)) return resolve()
    const script = document.createElement('script')
    script.src = url
    script.type = 'text/javascript'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load remote script: ${url}`))
    document.head.appendChild(script)
  })
}

// Dynamically load a federated module
export async function loadFederatedModule(remoteName: string, modulePath: string, url: string) {
  // load the remoteEntry.js
  await loadRemoteScript(url)

  // Initializes the share scope. This fills it with known provided modules from this build and all remotes
  // @ts-ignore
  await __webpack_init_sharing__('default')

  const container = (window as any)[remoteName]
  if (!container) throw new Error(`Container ${remoteName} not found on window after loading ${url}`)

  // @ts-ignore
  await container.init(__webpack_share_scopes__.default)
  const factory = await container.get(modulePath)
  const Module = factory()
  return Module
}

export function RemoteHost({ remoteName, module, url, fallback = <div>Loading remote...</div>, onError }: { remoteName: string; module: string; url: string; fallback?: React.ReactNode; onError?: (err: any) => void }) {
  const [Comp, setComp] = useState<any>(null)
  const [err, setErr] = useState<any>(null)

  useEffect(() => {
    let mounted = true
    loadFederatedModule(remoteName, module, url).then((m: any) => {
      if (!mounted) return
      setComp(() => m.default || m)
    }).catch(e => {
      setErr(e)
      if (onError) onError(e)
    })
    return () => { mounted = false }
  }, [remoteName, module, url])

  if (err) return <div className="text-red-600">Failed to load remote: {String(err.message || err)}</div>
  if (!Comp) return <>{fallback}</>
  return <Comp />
}
