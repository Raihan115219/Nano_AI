"use client";
import { Crisp } from "crisp-sdk-web";
import React, { useEffect } from "react";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("8641c531-e6aa-4016-a8f1-a0e1a8020a0d");
  }, []);

  return null;
};

export default CrispChat;
