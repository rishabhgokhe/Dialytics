"use client";

import { Button } from '@/components/ui/button';
import React from 'react';

const Page = () => {
  return (
    <Button onClick={() => alert("done")}>Click me</Button>
  );
};

export default Page;