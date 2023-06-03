# Locale Generator


Output the translation file used by next-i18next from tsv.

## Usage

```
npx locale-generator (tsv path) (output dir)
```

##### tsv format

```
_key,en,ja
pageTitle,Mypage,マイページ
buttonA.name,sign in,ログイン
buttonB.name,sign up,新規登録
```

##### example

```
mkdir locales
npx locale-generator example.tsv locales
```

## Results

```
locales/
  en/common.json
  ja/common.json
```

##### locales/en/common.json
```
{
  "pageTitle": "Mypage",
  "buttonA.name": "sign in",
  "buttonB.name": "sign up"
}
```

##### locales/ja/common.json
```
{
  "pageTitle": "マイページ",
  "buttonA.name": "ログイン",
  "buttonB.name": "新規登録"
}
```
