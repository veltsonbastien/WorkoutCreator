export const getWorkout = async (prompt: string): Promise<string | null> => {
  try {
    const res = await fetch("/api/workout", {
      method: "POST",
      body: JSON.stringify({
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
        prompt,
      }),
    });

    const data = await res.json();

    return data.message;
  } catch (e) {
    console.error(`Error getting workout: ${e}`);
    return null;
  }
};
