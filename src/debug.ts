import D from 'debug'

interface CustomDebugger extends D.Debugger {
    error: (...args: any[]) => void
    extend: (namespace: string, delimiter?: string) => CustomDebugger
}

function override() {
    const self = this
    self.log = console.log.bind(console, self.namespace)
    self.error = console.error.bind(console, self.namespace)
    const _extend = self.extend
    self.extend = (namespace: string, delimiter?: string) => {
        const _ext = _extend.call(self, namespace, delimiter)
        _ext.log = console.log.bind(console, _ext.namespace)
        _ext.error = console.error.bind(console, _ext.namespace)
        return _ext
    }
    return self
}

function _init(namespace: string): CustomDebugger {
    const self = this as CustomDebugger
    if (self) return self.extend(namespace)

    const ext = D(namespace)
    return override.call(ext)
}

export default _init('yane')
