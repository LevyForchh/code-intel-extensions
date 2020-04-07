// Stub Sourcegraph API
// This file should be imported before any other test file.

import mock from 'mock-require'
import { createStubSourcegraphAPI } from '@sourcegraph/extension-api-stubs'
const stubAPI = createStubSourcegraphAPI()
mock('sourcegraph', stubAPI)
