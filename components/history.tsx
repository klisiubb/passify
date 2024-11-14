import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { ClipboardCopy, Trash2 } from "lucide-react";
import { copyToClipboard, MAX_HISTORY } from "./utils";

interface HistoryComponentProps {
  history: string[];
  clearHistory: () => void;
}

export default function HistoryComponent({
  history,
  clearHistory,
}: HistoryComponentProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label>Password History</Label>
        <Button
          variant="outline"
          size="sm"
          onClick={clearHistory}
          aria-label="Clear history"
        >
          <Trash2 className="h-4 w-4 mr-2" /> Clear History
        </Button>
      </div>
      <ScrollArea className="h-[300px] w-full rounded-md border">
        <div className="p-4">
          {history.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No passwords in history
            </p>
          ) : (
            history.map((historyPassword, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b last:border-b-0"
              >
                <span className="font-mono text-sm">{historyPassword}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(historyPassword)}
                  aria-label={`Copy password ${historyPassword}`}
                >
                  <ClipboardCopy className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
