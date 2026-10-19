/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  visualReferences: {
    index: typeof routes['visual_references.index']
    show: typeof routes['visual_references.show']
    store: typeof routes['visual_references.store']
    update: typeof routes['visual_references.update']
    destroy: typeof routes['visual_references.destroy']
  }
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
  }
}
