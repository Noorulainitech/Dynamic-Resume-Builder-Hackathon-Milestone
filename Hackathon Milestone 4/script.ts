
declare const html2pdf :any;


const form = document.getElementById("resumeForm") as HTMLFormElement;
const resumePage = document.getElementById("resumePage") as HTMLDivElement;
const resumePhoto = document.getElementById("resumePhoto") as HTMLImageElement;
const resumeName = document.getElementById("resumeName") as HTMLHeadingElement;
const resumeEmail = document.getElementById("resumeEmail") as HTMLParagraphElement;
const resumePhone = document.getElementById("resumePhone") as HTMLParagraphElement;
const resumeDegree = document.getElementById("resumeDegree") as HTMLHeadingElement;
const resumeEducation = document.getElementById("resumeEducation") as HTMLParagraphElement;
const resumeWorkExperience = document.getElementById("resumeWorkExperience") as HTMLParagraphElement;
const resumeSkills = document.getElementById("resumeSkills") as HTMLParagraphElement;
const editButton = document.getElementById("editButton") as HTMLButtonElement;
const backButton = document.getElementById("backButton") as HTMLButtonElement;
const resumeContent = document.getElementById("resumeContent") as HTMLDivElement;

form.addEventListener("submit", async (event: Event) => {
    event.preventDefault();

    // Collecting form data
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const degree = (document.getElementById("degree") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLInputElement).value;
    const workExperience = (document.getElementById("workexperience") as HTMLTextAreaElement).value;
    const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;

    const photoInput = document.getElementById("photo") as HTMLInputElement;
    const photoFile = photoInput.files ? photoInput.files[0] : null;

    let photoBase64 = '';
    if (photoFile) {
        photoBase64 = await fileToBase64(photoFile);
        resumePhoto.src = photoBase64;
    }

    // Hide the form container and show the resume page
    document.getElementById("container")?.classList.add("hidden");
    resumePage.classList.remove("hidden");

    // Populate resume fields
    resumeName.textContent = name;
    resumeEmail.textContent = `Email: ${email}`;
    resumePhone.textContent = `Phone: ${phone}`;
    resumeDegree.textContent = degree;
    resumeEducation.textContent = education;
    resumeWorkExperience.textContent = workExperience;
    resumeSkills.textContent = skills;
});


// Checked file load
function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

editButton.addEventListener('click',()=>{
    updateFormFromResume();
    document.querySelector("#container")?.classList.remove("hidden");
    resumePage.classList.add("hidden")

})


function updateFormFromResume(){
    (document.getElementById("name") as HTMLInputElement).value = resumeName.textContent || '';
    (document.getElementById("email") as HTMLInputElement).value = resumeEmail.textContent?.replace('Email:','') || '';
    (document.getElementById("phone") as HTMLInputElement).value = resumePhone.textContent?.replace('Phone:','') || '';
    (document.getElementById("degree") as HTMLInputElement).value = resumeDegree.textContent || '';
    (document.getElementById("education") as HTMLInputElement).value = resumeEducation.textContent || '';
    (document.getElementById("workexperience") as HTMLTextAreaElement).value = resumeWorkExperience.textContent || '';
    (document.getElementById("skills") as HTMLTextAreaElement).value = resumeSkills.textContent || '';
}
