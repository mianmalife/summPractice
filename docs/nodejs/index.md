# NodeJs基础模块

一些基础模块使用的总结.

## 文件操作

文件操作使用fs模块:

**读文件**

```js{5}
import { readFile } from 'node:fs/promises'

try {
  const filePath = new URL('../package.json', import.meta.url)
  const filedata = await readFile(filePath, { encoding: 'utf8' })
  console.log(filedata)
} catch (error) {
  console.error(error)
}
```

**写文件**

```js{5}
import { writeFile } from 'node:fs/promise'

try {
  const filePath = new URL('./write.json', import.meta.url)
  await writeFile(filePath, '{ "a": 1, "b": 2 }')
} catch (error) {
  console.error(error)
}
```

## 读写流

**创建读取流**

```js{7,8}
import { open } from 'node:fs/promises'

let data = ",test: 123"

try {
  const filePath = new URL('../package.json', import.meta.url)
  const fd = await open(filePath)
  const readStream = fd.createReadStream()
  readStream.setEncoding('utf8')
  readStream.on('data', (chunk) => {
    data += chunk
  })
  readStream.on('end', () => {
    console.log('read end', data)
  })
  readStream.on('error', err => {
    console.error(err)
  })
} catch (error) {
  console.error(error)
}
```

**创建写入流**

```js{7}
import { createWriteStream } from 'node:fs'

let data = "hello"

try {
  const filePath = new URL('./write.json', import.meta.url)
  const writeStream = createWriteStream(filePath, { encoding: 'utf8', flags: 'a' })
  writeStream.write(data)
  writeStream.end()
  writeStream.on('finish', () => {
    console.log('write finish')
  })
} catch (error) {
  console.error(error)
}
```

**管道**

```js
import { createReadStream, createWriteStream } from 'node:fs'
import { createGzip } from 'node:zlib'

const pathObj = new URL('./input.txt', import.meta.url)
//createReadStream(pathObj)
//.pipe(createWriteStream(new URL('./output.txt', import.meta.url), { flags: 'a'}))
createReadStream(pathObj)
  .pipe(createGzip())
  .pipe(createWriteStream(new URL('./input.txt.gz', import.meta.url)))
console.log('file compressed')
```
## 更多

....
