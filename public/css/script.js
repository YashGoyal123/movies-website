// Frontend JavaScript code where the fetch request to delete the account is made
const deleteAccount = async (userId) => {
    try {
        const response = await fetch("/delete-account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
            throw new Error("Failed to delete account");
        }

        const data = await response.json();
        console.log(data);
        // Optionally, you can redirect the user to the sign-in page or perform any other action
        window.location.href = "/signin.html?alert=Account_deleted_successfully";
    } catch (error) {
        console.error("Error:", error.message);
    }
};

// Example usage: Call deleteAccount function when the user clicks on "Delete Account" link
const deleteAccountLink = document.getElementById("delete-account-link");
deleteAccountLink.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default action of navigating to the href URL
    const userId = "user_id"; // Replace "user_id" with the actual user ID
    deleteAccount(userId);
});
