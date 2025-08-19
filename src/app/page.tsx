"use client";

import { useState } from "react";

import RangeInput from "@/components/RangeInput";
import { validateEmail } from "@/utils/utils";
import { Input } from "@/components/Input";
import { InputEmail } from "@/components/InputEmail";
import { InputFile } from "@/components/InputFile";
import { DateTimePicker } from "@/components/DateTimePicker";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(8);
  const [file, setFile] = useState<File | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const isDisabledSumbit = () => {
    return !firstName || !lastName || !email || !file || !selectedDate || !time;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please use correct formatting.\nExample: address@email.com");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("age", String(age));
    if (file) formData.append("file", file);
    if (selectedDate) formData.append("date", selectedDate.toISOString());
    if (time) formData.append("time", time);

    try {
      const response = await fetch("http://letsworkout.pl/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      alert("Application sent!");
    } catch (err) {
      alert(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className={`min-h-screen flex justify-center items-center`}>
      <form
        onSubmit={handleSubmit}
        className={`p-6 rounded-2xl w-full max-w-md space-y-6`}
      >
        <h2 className={`font-medium mb-4 text-2xl`}>Personal info</h2>
        <Input
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <InputEmail
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />
        <RangeInput value={age} onChange={setAge} />
        <InputFile
          label="Photo"
          value={file}
          onChange={handleFileChange}
          close={() => setFile(null)}
        />

        <h2 className={`text-2xl font-medium mb-4 mt-8`}>Your workout</h2>
        <DateTimePicker
          labelDate="Date"
          labelTime="Time"
          dateValue={selectedDate}
          onChangeDate={setSelectedDate}
          timeValue={time}
          onChangeTime={setTime}
        />

        <button
          type="submit"
          className={`w-full rounded-md py-2 font-medium text-white submitButton transition cursor-pointer disabled:cursor-not-allowed`}
          disabled={isDisabledSumbit()}
        >
          Send Application
        </button>
      </form>
    </div>
  );
}
