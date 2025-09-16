<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGameRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check(); // In real app, check for admin role
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $gameId = $this->route('game')->id;
        
        return [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:games,slug,' . $gameId,
            'description' => 'required|string',
            'image_url' => 'nullable|string|url',
            'base_price' => 'required|numeric|min:0',
            'denominations' => 'required|array|min:1',
            'denominations.*.amount' => 'required|integer|min:1',
            'denominations.*.price' => 'required|numeric|min:0',
            'denominations.*.currency' => 'required|string|max:50',
            'is_active' => 'boolean',
            'server_type' => 'required|in:region,server_id,user_id',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Game name is required.',
            'slug.required' => 'Game slug is required.',
            'slug.unique' => 'This slug is already taken by another game.',
            'description.required' => 'Game description is required.',
            'denominations.required' => 'At least one denomination is required.',
            'denominations.min' => 'At least one denomination must be provided.',
        ];
    }
}