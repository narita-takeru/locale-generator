# Locale Generator


Output the translation file used by next-i18next from csv.
csv encoding is utf8.

## Usage

```
npx locale-generator (csv path) (output dir)
```

##### csv format

```
_key,en,ja
pageTitle,Mypage,マイページ
buttonA.name,sign in,ログイン
buttonB.name,sign up,新規登録
```

##### example

```
mkdir locales
npx locale-generator example.csv locales
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
