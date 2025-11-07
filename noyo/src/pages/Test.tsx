import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useState } from "react";

export default function Test() {
  const [testVal, setTestVal] = useState('<h1>Test</h1>')
  return (
    <div>
      <SimpleEditor value={testVal} onChange={(val) => setTestVal(val)} />
    </div>
  )
}
