"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import { MAX_HISTORY } from "@/components/utils";
import GeneratorComponent from "@/components/password-generator";
import HistoryComponent from "@/components/history";

export default function PasswordGenerator() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("passwordHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToHistory = (newPassword: string) => {
    const updatedHistory = [
      newPassword,
      ...history.filter((p) => p !== newPassword),
    ].slice(0, MAX_HISTORY);
    setHistory(updatedHistory);
    localStorage.setItem("passwordHistory", JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("passwordHistory");
  };

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Secure Password Generator</CardTitle>
          <CardDescription>
            Create and manage cryptographically strong passwords
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="generate">Generate</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="generate">
              <GeneratorComponent addToHistory={addToHistory} />
            </TabsContent>
            <TabsContent value="history">
              <HistoryComponent history={history} clearHistory={clearHistory} />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          Passwords are generated using cryptographically secure methods and
          stored locally.
        </CardFooter>
      </Card>
      <Toaster />
    </>
  );
}
