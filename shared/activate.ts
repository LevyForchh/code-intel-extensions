import * as sourcegraph from 'sourcegraph'
import { LanguageSpec } from './language-specs/spec'
import { Logger, RedactingLogger } from './logging'
import { createProviderWrapper } from './providers'

/**
 * A dummy context that is used for versions of Sourcegraph to 3.0.
 */
const DUMMY_CTX = {
    subscriptions: {
        add: (): void => {
            /* no-op */
        },
    },
}

/**
 * Register definition, reference, and hover providers with LSIF and search-based providers.
 *
 * @param ctx  The extension context.
 * @param selector The document selector for which this extension is active.
 * @param languageSpec The language spec used to provide search-based code intelligence.
 * @param logger An optional logger instance.
 */
export function activateCodeIntel(
    ctx: sourcegraph.ExtensionContext = DUMMY_CTX,
    selector: sourcegraph.DocumentSelector,
    languageSpec: LanguageSpec,
    logger: Logger = new RedactingLogger(console)
): void {
    const wrapper = createProviderWrapper(languageSpec, logger)

    ctx.subscriptions.add(
        sourcegraph.languages.registerDefinitionProvider(
            selector,
            wrapper.definition
        )
    )

    ctx.subscriptions.add(
        sourcegraph.languages.registerReferenceProvider(
            selector,
            wrapper.references
        )
    )

    ctx.subscriptions.add(
        sourcegraph.languages.registerHoverProvider(selector, wrapper.hover)
    )
}
