const form = document.getElementById('meu-form');
const textoPost = document.getElementById('texto-post');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    textoPost.innerText = "🤖 A IA está pensando...";

    // Faz a requisição direto para o Webhook de PRODUÇÃO do n8n
    const response = await fetch('https://blacklaion.app.n8n.cloud/webhook/23fd2132-c99b-426b-9385-ea53d085e2c8', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        })
    });

    // Pede para o navegador ler a resposta como texto puro
    const text = await response.text();

    // Substitui o Lorem Ipsum pela resposta da IA!
    textoPost.innerHTML = marked.parse(text);
});