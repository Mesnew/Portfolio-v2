import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Vérification des données
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 })
    }

    // Utilisation des variables d'environnement pour l'authentification
    const EMAIL_USER = process.env.EMAIL_USER
    const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD

    // Création du corps de l'email
    const emailContent = `
      Nom: ${name}
      Email: ${email}
      Sujet: ${subject}
      Message: ${message}
    `

    // Log des informations (pour le débogage)
    console.log("Tentative d'envoi d'email:")
    console.log(emailContent)
    console.log("Utilisant les identifiants:", EMAIL_USER)

    // Simulation d'envoi d'email (pour éviter d'utiliser nodemailer)
    // En production, vous pourriez utiliser un service comme SendGrid, Mailgun, etc.
    // via leur API REST sans avoir besoin d'installer de package npm

    // Exemple avec fetch vers un service d'email (à remplacer par votre service préféré)
    /*
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'your_service_id',
        template_id: 'your_template_id',
        user_id: 'your_user_id',
        template_params: {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message,
          to_email: 'lilyangiraud@gmail.com',
        },
      }),
    });
    */

    // Pour l'instant, simulons une réponse réussie
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error)
    return NextResponse.json({ error: "Erreur lors de l'envoi de l'email" }, { status: 500 })
  }
}

