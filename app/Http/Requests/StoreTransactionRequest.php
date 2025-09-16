<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => 'required|in:game_topup,voucher',
            'item_name' => 'required|string|max:255',
            'item_details' => 'required|array',
            'amount' => 'required|numeric|min:1',
            'currency' => 'sometimes|string|size:3',
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
            'type.required' => 'Transaction type is required.',
            'type.in' => 'Invalid transaction type.',
            'item_name.required' => 'Item name is required.',
            'item_details.required' => 'Item details are required.',
            'amount.required' => 'Amount is required.',
            'amount.numeric' => 'Amount must be a valid number.',
            'amount.min' => 'Amount must be greater than 0.',
        ];
    }
}