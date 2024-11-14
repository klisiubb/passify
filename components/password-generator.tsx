"use client";

import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ClipboardCopy, RefreshCw } from "lucide-react";
import { generatePassword, copyToClipboard } from "./utils";
import { useToast } from "@/hooks/use-toast";

interface GeneratorComponentProps {
  addToHistory: (password: string) => void;
}

export default function GeneratorComponent({
  addToHistory,
}: GeneratorComponentProps) {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const { toast } = useToast();

  const handleGeneratePassword = () => {
    if (!(uppercase || lowercase || numbers || symbols)) {
      toast({
        title: "Error",
        description: "Please select at least one character type.",
        variant: "destructive",
      });
      return;
    }
    const newPassword = generatePassword(
      length,
      uppercase,
      lowercase,
      numbers,
      symbols
    );
    setPassword(newPassword);
    addToHistory(newPassword);
  };

  const handleCopyToClipboard = async () => {
    if (password) {
      await copyToClipboard(password);
      toast({
        title: "Copied to clipboard",
        description: "The password has been copied to your clipboard.",
        duration: 2000,
      });
    }
  };

  const isGenerateDisabled = !(uppercase || lowercase || numbers || symbols);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">Generated Password</Label>
        <div className="flex space-x-2">
          <Input
            id="password"
            value={password}
            readOnly
            className="flex-grow"
            placeholder={
              password
                ? ""
                : 'Click "Generate New Password" to create a password'
            }
          />
          <Button
            onClick={handleCopyToClipboard}
            size="icon"
            aria-label="Copy password"
            disabled={!password}
          >
            <ClipboardCopy className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Password Length: {length}</Label>
        <Slider
          value={[length]}
          onValueChange={(value) => setLength(value[0])}
          min={8}
          max={64}
          step={1}
        />
      </div>
      <div className="space-y-2">
        <Label>Include:</Label>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="uppercase"
              checked={uppercase}
              onCheckedChange={(checked) => setUppercase(checked === true)}
            />
            <Label htmlFor="uppercase">Uppercase</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="lowercase"
              checked={lowercase}
              onCheckedChange={(checked) => setLowercase(checked === true)}
            />
            <Label htmlFor="lowercase">Lowercase</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="numbers"
              checked={numbers}
              onCheckedChange={(checked) => setNumbers(checked === true)}
            />
            <Label htmlFor="numbers">Numbers</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="symbols"
              checked={symbols}
              onCheckedChange={(checked) => setSymbols(checked === true)}
            />
            <Label htmlFor="symbols">Symbols</Label>
          </div>
        </div>
      </div>
      <Button
        onClick={handleGeneratePassword}
        className="w-full"
        disabled={isGenerateDisabled}
      >
        <RefreshCw className="mr-2 h-4 w-4" /> Generate New Password
      </Button>
    </div>
  );
}
