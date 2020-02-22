# Docsearch crawl docker action

This action crawls a given website and index data for search.
It also prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Inputs

### `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

## Outputs

### `time`

The time we greeted you.

## Example usage

```yaml
uses: actions/docsearch-crawl
with:
  who-to-greet: "Mona the Octocat"
```
