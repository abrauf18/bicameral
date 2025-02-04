import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"


export default function SidePanel({ data, currentSample, setCurrentSample, onHover, onValueChange }) {
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <div className="space-y-4">
      <Select value={currentSample} onValueChange={setCurrentSample}>
        <SelectTrigger>
          <SelectValue placeholder="Select a sample" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(data).map((sample) => (
            <SelectItem key={sample} value={sample}>
              Sample {sample}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Accordion type="single" collapsible>
        {Object.entries(data[currentSample]).map(([itemId, itemData]) => {
          if (itemId === 'images') return null;
          return (<AccordionItem key={itemId} value={itemId}>
            <AccordionTrigger
              onMouseEnter={() => onHover(itemId)}
              onMouseLeave={() => onHover(null)}
              onClick={() => setSelectedItem(itemId)}
            >
              {itemId}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <Badge>{itemData.result}</Badge>
                <p>Unique ID: {itemData.unique_id}</p>
                {Object.entries(itemData)
                  .filter(([key]) => key.endsWith("_value"))
                  .map(([docId, value]) => (
                    <div key={docId} className="flex items-center space-x-2">
                      <span>{docId.replace("_value", "")}:</span>
                      <Input
                        type="text"
                        value={value}
                        onChange={(e) => onValueChange(itemId, docId.replace("_value", ""), e.target.value)}
                      />
                    </div>
                  ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

