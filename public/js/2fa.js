document.getElementById('showQrCode').addEventListener('click', async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Veuillez vous connecter pour activer le 2FA');
            return;
        }

        const response = await fetch('/api/2fa/setup', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la génération du QR code');
        }

        const data = await response.json();
        document.getElementById('modalQrCodeImage').src = data.qrCode;
        
        // Afficher la modale
        const qrCodeModal = new bootstrap.Modal(document.getElementById('qrCodeModal'));
        qrCodeModal.show();
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de la génération du QR code');
    }
});

async function verify2FA() {
    try {
        const token = localStorage.getItem('token');
        const twoFactorCode = document.getElementById('2faCode').value;

        if (!twoFactorCode) {
            alert('Veuillez entrer le code 2FA');
            return;
        }

        const response = await fetch('/api/2fa/verify', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ twoFactorCode })
        });

        const data = await response.json();

        if (response.ok) {
            alert('2FA activé avec succès !');
            const modal = bootstrap.Modal.getInstance(document.getElementById('qrCodeModal'));
            modal.hide();
            location.reload();
        } else {
            alert(data.error || 'Code 2FA invalide');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de la vérification du code 2FA');
    }
}
