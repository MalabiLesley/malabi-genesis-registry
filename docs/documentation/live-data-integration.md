# Live Data Integration Plan

The explorer is now prepared to display either local registry data or normalized live metadata from remote NFT sources.

## Current Approach
- The explorer first checks the local Genesis Registry.
- If no match is found, it attempts to fetch remote metadata from a live NFT endpoint.
- Any incoming payload is normalized into the registry schema before rendering.

## Expected Future Integration
When Crystara exposes a stable public API or wallet-linked metadata endpoint, this layer can be connected directly to it.

## Notes
- The current implementation is a compatibility bridge, not a final production integration.
- A future production version should use authenticated endpoints and explicit contract metadata handling.
