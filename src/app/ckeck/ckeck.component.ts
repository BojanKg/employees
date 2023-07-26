import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as Tesseract from 'tesseract.js';

@Component({
  selector: 'app-ckeck',
  templateUrl: './ckeck.component.html',
  styleUrls: ['./ckeck.component.css'],
})
export class CkeckComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElement: ElementRef;
  @ViewChild('canvasElement') canvasElement: ElementRef;

  public cameraOn: boolean = false;
  public scannedText: string;
  
  ngAfterViewInit(): void {
    this.initCamera();
  }

  async initCamera() {
    try {
      const video = this.videoElement.nativeElement;
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      video.srcObject = stream;
    } catch (error) {
      console.error('Greška prilikom inicijalizacije kamere:', error);
    }
  }

  async scanText() {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    // Postavljanje dimenzija canvas-a na dimenzije videa
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Crtanje videa na canvas
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    // Prepoznavanje teksta sa slike
    const { data } = await Tesseract.recognize(
      canvas,
      'eng', // Možete koristiti druge jezike zavisno od podrške Tesseract.js
      { logger: info => console.log(info) } // Opciono, koristi se za ispisivanje informacija tokom prepoznavanja
    );

    this.scannedText = data.text;
  }

  toggleCamera() {
    this.cameraOn = !this.cameraOn;

    if (this.cameraOn) {
      this.startCamera();
    } else {
      this.stopCamera();
    }
  }

  private startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.videoElement.nativeElement.srcObject = stream;
      })
      .catch(error => console.error('Došlo je do greške pri uključivanju kamere:', error));
  }

  private stopCamera() {
    const stream = this.videoElement.nativeElement.srcObject as MediaStream;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      this.videoElement.nativeElement.srcObject = null;
    }
  }

  ngOnDestroy() {
    this.stopCamera();
  }

}
